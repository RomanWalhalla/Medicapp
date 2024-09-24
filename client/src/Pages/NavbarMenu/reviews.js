import "../../styles/reviews.css"
import { AgGridReact } from "ag-grid-react"
import { Button } from "@mui/material"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { /* useContext, useEffect, */ useEffect, useMemo, useState } from "react"
// import Context from "../../context/Context"
import useLoadUserData from "../../api/loadUserData"
import ReviewModal from "./reviewModal"


const Reviews = () => {
    // const { notifyError, notifySuccess } = useContext(Context)
    // const [appointmentsServer, setAppointmentsServer] = useState("")
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [rowData, setRowData] = useState([
        { id: "", number: "", doctorName: "", doctorSpeciality: "", provideReview: "", reviewGiven: "", isReviewSubmitted: false }
    ])

    // console.log("rowData", rowData);

    const renderCellButton = () => (params) => (
        // console.log("renderCellButton - params", params),
        <>
            <Button
                onClick={() => {
                    setSelectedDoctor(params.data);
                    setIsOpenModal(true)
                }
                }
                variant="contained"
                disabled={params.data.isReviewSubmitted} // Деактивируем кнопку, если отзыв уже оставлен
                sx={{fontSize: 9, width: "100%"}}
            >
                {params.data.isReviewSubmitted ? "Review Submitted" : "Give Review"}
            </Button>
        </>
    )

    const columnDataTable = useMemo(() => [
        { headerName: "ID", field: "id", flex: 1, hide: true },
        { headerName: "№", field: "number", flex: 1 },
        { headerName: "Doctor Name", field: "doctorName", flex: 2, },
        { headerName: "Doctor Speciality", field: "doctorSpeciality", flex: 2 },
        { headerName: "Provide Review", field: "provideReview", cellRenderer: renderCellButton(), flex: 2 },
        { headerName: "Review Given", field: "reviewGiven", flex: 2 }
    ], [])

    // console.log("columnDataTable", columnDataTable);

    const defaultColDef = useMemo(() => {
        return {
            filter: 'agTextColumnFilter',
            floatingFilter: true,
        };
    }, []);

    const { appointmentsData, appointmentsStatus } = useLoadUserData("Appointments");

    // console.log("appointmentsData", appointmentsData);


    useEffect(() => {
        if (appointmentsStatus === "Loaded" && appointmentsData) {
            // Преобразуем данные о бронированиях в формат rowData
            const formattedData = appointmentsData.map((appointment, index) => ({
                id: appointment._id,
                number: index + 1,
                doctorName: `${appointment.doctorId?.firstName || ""} ${appointment.doctorId?.lastName || ""}` || "Unknown",
                doctorSpeciality: appointment.doctorId?.speciality || "Unknown",
                provideReview: "",
                reviewGiven: appointment.review || "Not Provided",
                isReviewSubmitted: appointment.review ? true : false
            }));

            setRowData(formattedData);
        }
    }, [appointmentsData, appointmentsStatus]);

    return (
        <div className="reviewsPage_container">
            <h2>Reviews</h2>
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
            <ReviewModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} setRowData={setRowData} selectedDoctor={selectedDoctor} />
        </div>
    );
}

export default Reviews;