"use client";
import { Dispatch, SetStateAction, useState } from "react";


interface DemoPopupProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DemoCredentialsPopup({ setOpen }: DemoPopupProps) {

    const [copied, setCopied] = useState<string | null>(null);

    const copy = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);

        setTimeout(() => {
            setCopied(null);
        }, 1500);
    };

    const CredentialRow = ({
        label,
        value,
        id,
    }: {
        label: string;
        value: string;
        id: string;
    }) => (
        <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">{label}</p>

            <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                <span className="text-sm font-medium text-gray-900">{value}</span>

                <button
                    onClick={() => copy(value, id)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                    {copied === id ? "Copied ✓" : "Copy"}
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="relative w-[380px] rounded-2xl bg-white shadow-2xl p-6">

                {/* Close */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold text-gray-900 mb-5">
                    Demo Login Credentials
                </h2>

                {/* ADMIN */}
                <div className="mb-5 border rounded-xl p-3 bg-gray-50">
                    <p className="text-sm font-semibold text-gray-800 mb-3">
                        Admin Login
                    </p>

                    <CredentialRow
                        label="Email"
                        value="admin@nmcarolina.co.in"
                        id="admin-email"
                    />

                    <CredentialRow
                        label="Password"
                        value="AtzHSptV"
                        id="admin-password"
                    />
                </div>

                {/* EMPLOYEE */}
                <div className="border rounded-xl p-3 bg-gray-50">
                    <p className="text-sm font-semibold text-gray-800 mb-3">
                        Employee Login
                    </p>

                    <CredentialRow
                        label="Email"
                        value="nabarunmiddya@nmcarolina.co.in"
                        id="employee-email"
                    />

                    <CredentialRow
                        label="Password"
                        value="acpdDVTt"
                        id="employee-password"
                    />
                </div>

                <button
                    onClick={() => setOpen(false)}
                    className="mt-6 w-full rounded-lg bg-black text-white py-2.5 text-sm font-medium hover:bg-gray-900 transition"
                >
                    Close
                </button>

            </div>
        </div>
    );
}