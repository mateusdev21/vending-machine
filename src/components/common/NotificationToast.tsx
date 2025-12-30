import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeNotification } from "../../features/notificationSlice";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle
} from "react-icons/fa";

const typeColorMap: Record<string, string> = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500"
};

export default function NotificationToast() {
    const dispatch = useAppDispatch();

    const notifications = useAppSelector(
        state => state.notification.items
    );

    useEffect(() => {
        notifications.forEach(n => {
            const timer = setTimeout(() => {
                dispatch(removeNotification(n.id));
            }, 3000);

            return () => clearTimeout(timer);
        });
    }, [notifications, dispatch]);

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map(n => (
                <div
                    key={n.id}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white
                ${n.color ?? typeColorMap[n.type]}
              `}
                >
                    {n.type === "success" && <FaCheckCircle />}
                    {n.type === "error" && <FaTimesCircle />}
                    {n.type === "warning" && (
                        <FaExclamationTriangle />
                    )}

                    <span className="text-sm">{n.message}</span>
                </div>
            ))}
        </div>
    );
}
