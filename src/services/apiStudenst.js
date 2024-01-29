import supabase, {supabaseUrl} from "./supabase.js";

export const getStudents = async () => {
    let {data, error} = await supabase
        .from('students')
        .select('*')
        .order("name", {ascending: true})


    if (error) {
        console.error(error);
        throw new Error("Students could not be loaded");
    }


    return data;
}

export const getCoursesName = async () => {
    let {data, error} = await supabase
        .from('courses')
        .select('name')

    if (error) {
        console.error(error);
        throw new Error("Courses could not be loaded");
    }
    return data
}

export const createStudent = async (newStudent, id) => {
    const hasImagePath = newStudent.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newStudent.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = hasImagePath
        ? newStudent.image
        : `${supabaseUrl}/storage/v1/object/public/students_avatar/${imageName}`;

    // 1. Create/edit course
    let query = supabase.from("students");


    // A) CREATE
    if (!id) query = query.insert([{...newStudent, image: imagePath}]);

    // B) EDIT
    if (id) query = query.update({...newStudent, image: imagePath}).eq("id", id);

    const {data, error} = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Student could not be created");
    }

    // 2. Upload image
    if (hasImagePath) return data;
    const {error: storageError} = await supabase.storage
        .from("students_avatar")
        .upload(imageName, newStudent.image);

    // 3. Delete the cabin IF there was an error uplaoding image
    if (storageError) {
        await supabase.from("students").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Student image could not be uploaded and the student was not created"
        );
    }

    return data;

}

export const deleteStudent = async (id) => {
    const {data, error} = await supabase
        .from('students')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error("Course could not be deleted");
    }
    return data;
}