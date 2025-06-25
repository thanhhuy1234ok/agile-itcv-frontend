import type { IUser } from "@/types/api";
import { createContext, useContext, useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

interface IAppContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    setUser: (v: IUser | null) => void;
    user: IUser | null;
    isAppLoading: boolean;
    setIsAppLoading: (v: boolean) => void;
    onLogin: (userData: IUser) => void;
    onLogout: () => void
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: TProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

    // Kiểm tra localStorage để tự đăng nhập lại
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
        }
        setIsAppLoading(false);
    }, []);

    // Hàm login
    const onLogin = (userData: IUser) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const onLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
    };

    return (
        <>
            {!isAppLoading ? (
                <CurrentAppContext.Provider
                    value={{
                        isAuthenticated,
                        user,
                        setIsAuthenticated,
                        setUser,
                        isAppLoading,
                        setIsAppLoading,
                        onLogin,
                        onLogout,
                    }}
                >
                    {children}
                </CurrentAppContext.Provider>
            ) : (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <PacmanLoader size={30} color="#36d6b4" />
                </div>
            )}
        </>
    );
};

export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext);

    if (!currentAppContext) {
        throw new Error("useCurrentApp has to be used within <CurrentAppContext.Provider>");
    }

    return currentAppContext;
};
