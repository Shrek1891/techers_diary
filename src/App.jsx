import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Users from "./pages/Users.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import {DarkModeProvider} from "./context/DarkModeContext.jsx";
import Courses from "./pages/Courses.jsx";
import Students from "./pages/Students.jsx";
import Lessons from "./pages/Lessons.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTimeout: 0,
        }
    }
});

function App() {
    return (
        <DarkModeProvider>
            <QueryClientProvider client={queryClient}>
                <GlobalStyles/>
                <BrowserRouter>
                    <Routes>
                        <Route element={
                            <ProtectedRoute>
                                <AppLayout/>
                            </ProtectedRoute>
                        }>
                        </Route>
                        <Route element={<AppLayout/>}>
                            <Route index element={<Navigate to="lessons" replace/>}/>
                            <Route path="courses" element={<Courses/>}/>
                            <Route path="students" element={<Students/>}/>
                            <Route path="lessons" element={<Lessons/>}/>
                            <Route path="users" element={<Users/>}/>
                            <Route path="accounts" element={<Account/>}/>
                        </Route>
                        <Route path="login" element={<Login/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{
                        margin: "8px"
                    }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 3000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "400px",
                            padding: "8px 16px",
                            backgroundColor: "var(--color-grey-0)",
                            color: "var(--color-grey-600)",
                        }
                    }}
                />
            </QueryClientProvider>
        </DarkModeProvider>
    )
}

export default App
