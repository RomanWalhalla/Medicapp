import logo from "../../img/logo.png"
import { Document, Page, Text, View, Image, PDFViewer } from "@react-pdf/renderer"
// import { PDFViewer } from "@react-pdf/renderer"

const DocumentPDF = ({ isOpenPDF, setIsOpenPDF, selectedDoctor }) => {
    return (
        <>
            {isOpenPDF && selectedDoctor ? (
                <PDFViewer style={{ width: "100%", height: "100vh" }}>
                    <Document>
                        <Page size="A4">
                            <View style={{ display: "flex", flexDirection: "row",  justifyContent: "space-between", margin: "20px" }}>
                                <View /* className="nav_logo" */ style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={{ margin: "5px", }}>StayHealthy</Text>
                                    <View>
                                        <span><Image src={logo} id="logo" alt="Logo" style={{ width: "25px", height: "25px", borderRadius: "50%" }} /></span>
                                    </View>
                                    <hr />
                                </View>
                                    <View style={{ margin: "10px" }}>
                                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Patient Information</Text>
                                        <Text>Name: {selectedDoctor?.patientName}</Text>
                                        <Text>Gender: { }</Text>
                                        <Text>Date of Birth: { }</Text>
                                        <Text>Phone Number: {selectedDoctor?.patientPhone}</Text>
                                        <Text>Email: { }</Text>
                                    </View>
                            </View>
                            <View style={{ /* margin: "20px", */ padding: "20px" }}>
                                <Text style={{ fontSize: 18, marginBottom: 10 }}>Prescription Details</Text>
                                <Text>Doctor: {selectedDoctor?.doctorName}</Text>
                                <Text>Doctor speciality: {selectedDoctor?.doctorSpeciality}</Text>
                                <Text>Medical License: { }</Text>
                                <Text>Phone Number: {selectedDoctor?.doctorPhone}</Text>
                                <Text>Date: {selectedDoctor?.date}</Text>
                                <Text></Text>
                            </View>
                            <View style={{ padding: "20px"}}>
                                <Text>Prescriptions:</Text>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            ) : null}
        </>
    );
}

export default DocumentPDF;