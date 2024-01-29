import supabase, {supabaseUrl} from "./supabase.js";

export async function getCourses() {
    const {data, error} = await supabase.from("courses").select("*").order("name", {ascending: true});

    if (error) {
        console.error(error);
        throw new Error("Courses could not be loaded");
    }

    return data;
}

export async function deleteCourse(id) {
    const {data, error} = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error("Course could not be deleted");
    }
    return data;
}

export async function createCourse(newCourse, id) {
    const hasImagePath = newCourse.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCourse.image.name}`.replaceAll(
        "/",
        ""
    );

    const imagePath = hasImagePath
        ? newCourse.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;


    // 1. Create/edit course
    let query = supabase.from("courses");

    // A) CREATE
    if (!id) query = query.insert([{...newCourse, image: imagePath}]);

    // B) EDIT
    if (id) query = query.update({...newCourse, image: imagePath}).eq("id", id);

    const {data, error} = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Course could not be created");
    }

    // 2. Upload image
    if (hasImagePath) return data;

    const {error: storageError} = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCourse.image);

    // 3. Delete the cabin IF there was an error uplaoding image
    if (storageError) {
        console.log(storageError);
        await supabase.from("courses").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Course image could not be uploaded and the cabin was not created"
        );
    }

    return data;
}