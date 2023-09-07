import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
};

export const deleteCabin = async (id) => {
  let { data: cabins, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
};

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return data;

  // upload image

  const { error: stroageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (stroageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(stroageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
};
