import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { onMessageListener } from "./firebase";
import useAndroidBackHandler from "./hooks/useAndroidBackHandler";

function App() {

   useEffect(() => {
        // Listen foreground notifications globally
        onMessageListener()
            .then((payload: any) => {
                console.log("Notification received:", payload);

                alert(payload?.notification?.title);
            })
            .catch((err: any) => console.log(err));
    }, []);

    useAndroidBackHandler();

    return (
        <>
            <Toaster position="bottom-center" />
            <AppRoutes />
        </>
    );
}

export default App;