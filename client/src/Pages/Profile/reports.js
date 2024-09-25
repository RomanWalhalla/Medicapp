import "../../styles/reviews.css"
import { AgGridReact } from "ag-grid-react"
import { Button } from "@mui/material"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { /* useContext, useEffect, */ useEffect, useMemo, useState } from "react"
// import Context from "../../context/Context"
import useLoadUserData from "../../api/loadUserData"
import DocumentPDF from "./documentPDF"
import { PDFViewer } from "@react-pdf/renderer"


const Reports = () => {
    // const { notifyError, notifySuccess } = useContext(Context)
    // const [appointmentsServer, setAppointmentsServer] = useState("")
    const [isOpenPDF, setIsOpenPDF] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [rowData, setRowData] = useState([
        { id: "", number: "", doctorName: "", doctorSpeciality: "", viewReport: "", downloadReport: "", /* isReviewSubmitted: false  */ }
    ])

    console.log("rowData", rowData);
    console.log("selectedDoctor", selectedDoctor);

    const renderCellButtonView = () => (params) => (
        // console.log("renderCellButton - params", params),
        <>
            <Button
                onClick={() => {
                    setSelectedDoctor(params.data);
                    setIsOpenPDF(true)
                }
                }
                variant="contained"
                // disabled={params.data.isReviewSubmitted} // Деактивируем кнопку, если отзыв уже оставлен
                sx={{ fontSize: 9, width: "100%" }}
            >
                Provide Review
            </Button>
        </>
    )
    const renderCellButtonDownload = () => (params) => (
        // console.log("renderCellButton - params", params),
        <>
            <Button
                onClick={() => {
                    setSelectedDoctor(params.data);
                    setIsOpenPDF(true)
                }
                }
                variant="contained"
                disabled={params.data.isReviewSubmitted} // Деактивируем кнопку, если отзыв уже оставлен
                sx={{ fontSize: 9, width: "100%" }}
            >
                Download Report
            </Button>
        </>
    )

    const columnDataTable = useMemo(() => [
        { headerName: "ID", field: "id", flex: 1, hide: true },
        { headerName: "№", field: "number", flex: 1 },
        { headerName: "Doctor Name", field: "doctorName", flex: 2, },
        { headerName: "Doctor Speciality", field: "doctorSpeciality", flex: 2 },
        { headerName: "View Report", field: "viewReport", cellRenderer: renderCellButtonView(), flex: 2 },
        { headerName: "Download Report", field: "downloadReport", cellRenderer: renderCellButtonDownload(), flex: 2 }
    ], [])

    // console.log("columnDataTable", columnDataTable);

    const defaultColDef = useMemo(() => {
        return {
            filter: 'agTextColumnFilter',
            floatingFilter: true,
        };
    }, []);

    const { appointmentsData, appointmentsStatus } = useLoadUserData("Appointments");

    console.log("appointmentsData", appointmentsData);


    useEffect(() => {
        if (appointmentsStatus === "Loaded" && appointmentsData) {
            // Преобразуем данные о бронированиях в формат rowData
            const formattedData = appointmentsData.map((appointment, index) =>
            (
                // console.log(appointment),
                {
                    id: appointment._id,
                    number: index + 1,
                    doctorName: `${appointment.doctorId?.firstName || ""} ${appointment.doctorId?.lastName || ""}` || "Unknown",
                    doctorSpeciality: appointment.doctorId?.speciality || "Unknown",
                    doctorPhone: appointment.doctorId?.phoneNumber || "Unknown",
                    patientName: `${appointment.patientId?.firstName || ""} ${appointment.patientId?.lastName || ""}` || "Unknown",
                    patientPhone: appointment.patientId?.phoneNumber || "Unknown",
                    date: appointment.date || "Unknown",
                    provideReview: "",
                    reviewGiven: appointment.review || "Not Provided",
                    isReviewSubmitted: appointment.review ? true : false
                }));

            setRowData(formattedData);
        }
    }, [appointmentsData, appointmentsStatus]);

    return (
        <div className="reviewsPage_container" style={{minHeight: "100vh"}}>
            <h2>Reports</h2>
            <div className={"ag-theme-quartz-dark"} /* style={{ height: 360, width: "90%", margin: 30 }} */>
                <AgGridReact
                    // defaultColDef={{ sortable: true, filter: true }}
                    defaultColDef={defaultColDef}
                    rowSelection="multiple"
                    suppressRowClickSelection={true}
                    rowData={rowData}
                    columnDefs={columnDataTable}
                >
                </AgGridReact>
            </div>
            {isOpenPDF ? 
            (
            // <PDFViewer style={{ width: "100%", heigh: "90vh" }}>
                <DocumentPDF isOpenPDF={isOpenPDF} setIsOpenPDF={setIsOpenPDF} /* setRowData={setRowData} */ selectedDoctor={selectedDoctor} />
            // </PDFViewer>
            )
                : null}
        </div>
    );
}

export default Reports;