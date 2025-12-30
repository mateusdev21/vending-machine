export default function BaseModal({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-black p-6 rounded-xl w-[90%] max-w-md">
                {children}
            </div>
        </div>
    );
}
