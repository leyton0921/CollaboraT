"use client";
import React, { useState } from "react";
import Style from "../styles/FileUpload.module.css";

const UploadCSV = ({ companyId }: { companyId: string | null }) => {
    const [fileName, setFileName] = useState("No hay archivos seleccionados");
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setFileName(file.name);
            sendUsersToServer(file);
        } else {
            console.error("No se seleccionó ningún archivo.");
        }
    };

    const sendUsersToServer = async (file: File) => {
        if (!companyId) {
            console.error("companyId no está disponible.");
            return;
        }

        setLoading(true);
        try {
            console.log("Sending users to server");
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(
                `http://localhost:4000/api/v1/auth/register/companies/${companyId}/collaborators`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: formData // Asegúrate de añadir el body
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al enviar los usuarios al servidor");
            }
            console.log("Se enviaron usuarios al servidor")

            const blob = await response.blob();
            console.log(blob)
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "credenciales.xlsx";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error("Error al enviar los usuarios al servidor:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className={Style["content-title"]}>
            </div>
            <div className={Style["file-upload-container"]}>
                <label htmlFor="upload" className={Style["uploadButton"]}>
                    <span className={Style["icon"]}>📁</span> Cargar
                </label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className={Style["inputField"]}
                    id="upload"
                />
                <span className={Style["fileName"]}>{fileName}</span>
                <button
                    type="button"
                    className={Style["uploadButton"]}
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Descargar"}
                </button>
            </div>
        </div>
    );
};

export default UploadCSV;
