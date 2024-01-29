import supabase from "./supabase.js";

function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {
        month: '2-digit',
    });
    const day = date.toLocaleString('default', {day: '2-digit'});

    return [year, month, day].join("-");
}

export const getLessons = async ({filter, sortBy}) => {

    const order = sortBy === "startDate-desc";
    let query = await supabase.from("lessons").select("*", {count: "exact"}).order("date", {ascending: order});
    if (filter === "checked-out") {
        query = await supabase.from("lessons").select("*", {count: "exact"}).eq("status", true).order("date", {ascending: order})
    }
    if (filter === "checked-in") {
        query = await supabase.from("lessons").select("*", {count: "exact"}).eq("status", false).order("date", {ascending: order})
    }
    const {data, error, count} = await query;
    if (error) {
        console.error(error);
        throw new Error("Lessons could not be loaded");
    }
    if (filter === "today") {
        return data.filter(lesson => {
            return lesson.date === formatDate(new Date())
        })

    }

    console.log(formatDate(new Date()));
    console.log(data)
    console.log(data[1].date === formatDate(new Date()))
    console.log(data[1].date.split("-").filter((filter, index) => filter === formatDate(new Date())[index]));

    return data;
}

export const getLessonsName = async () => {
    let {data, error} = await supabase
        .from('lessons')
        .select('student')


    if (error) {
        console.error(error);
        throw new Error("students could not be loaded");
    }


    return data
}

export const getNameStudents = async () => {
    let {data, error} = await supabase
        .from('students')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error("students could not be loaded");
    }
    return data
}

export const createLesson = async (data, id) => {
    let query = supabase.from("lessons");
    let newStudent;
    if (typeof data.student === "string") {
        newStudent = JSON.parse(data.student);
    } else {
        newStudent = {...data.student}
    }

    const idStudent = +newStudent?.id;
    const {
        data: studentCourse,
        error: errorCourse
    } = await supabase.from("students").select("*").eq("id", +idStudent).single();
    const newData = {
        ...data,
        status: false,
        student: newStudent,
        course: studentCourse?.course
    }


    if (!id) query = query.insert({...newData});
    if (id) query = query.update({...data}).eq("id", id);

    const {newData: lesson, error} = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Lesson could not be created");
    }
    return lesson;
}
export const updateLessonByStatus = async (id) => {
    const {data, error} = await supabase
        .from("lessons")
        .update({status: true})
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Lesson could not be updated");
    }
    return data

}


export const getCourseById = async (id) => {
    const {data, error} = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Course could not be loaded");
    }

    return data;
}

export async function deleteLesson(id) {
    const {data, error} = await supabase
        .from('lessons')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error("Lesson could not be deleted");
    }
    return data;
}