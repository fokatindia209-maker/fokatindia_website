import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { onMessageListener } from "./firebase";

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

    return <AppRoutes />;
}

export default App;