import supabase, {supabaseUrl} from "./supabase.js";

export const signup = async ({fullName, email, password}) => {
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName: fullName,
                avatar: 'https://i.pravatar.cc/300'
            }
        }
    })
    if (error) throw new Error(error.message);
    return data
}

export const login = async ({email, password}) => {
    let {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw new Error(error.message);
    return data
}

export const getCurrentUser = async () => {
    const {data: session} = await supabase.auth.getSession();
    if (!session) return null;
    const {data, error} = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return data?.user;
}

export const logout = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export const updateCurrentUser = async ({fullName, password, avatar}) => {
    let updateData;
    if (password) updateData = {password}
    if (fullName) updateData = {data: {fullName}}
    const {data, error} = await supabase.auth.updateUser(updateData);
    if (error) throw new Error(error.message);
    if (!data) return data;
    const fileName = `avatar-${data.user.id}-${Math.random()}`;
    const {error: storageError} = await supabase.storage.from("avatars").upload(fileName, avatar);
    if (storageError) throw new Error(storageError.message);

    const {data: updatedUser, error: updateError} = await supabase.auth.updateUser(
        {
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
            }

        }
    );
    if (updateError) throw new Error(updateError.message);
    return updatedUser
}



