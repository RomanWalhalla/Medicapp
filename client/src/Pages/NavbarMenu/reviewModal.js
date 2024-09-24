import { Modal, Box, Button, TextField, Typography, TextareaAutosize } from "@mui/material"
import { red } from "@mui/material/colors";

import React, { useState } from "react";
// import "./ReviewModal.css"; // Стили для модального окна

const ReviewModal = ({ isOpenModal, setIsOpenModal, setRowData, selectedDoctor }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);

    // console.log("selectedDoctor", selectedDoctor);


    const handleSubmit = () => {
        // console.log("reviewData", reviewData)
        const reviewData = {
            description: description.trim(), // Получаем текст отзыва
            rating: rating
        };
        setRowData((prevRowData) => prevRowData.map((row) =>
            // console.log("row", row)
            row.number === selectedDoctor.number
                ? {
                    ...row,
                    reviewGiven: reviewData.description,
                    provideReview: "Review Submitted", 
                    isReviewSubmitted: true
                }
                : row
        )
        )
        // console.log("props", props);
        // onSubmit({ name, description, rating });
        setIsOpenModal(false); // Закрыть модальное окно после отправки
    };

    const onCloseModal = () => {
        setIsOpenModal(false)
    }

    return (
        <>
            <Modal open={isOpenModal} onClose={onCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        left: "50%",
                        height: "400",
                        width: 300,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "teal",
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 2,
                    }}>
                    <Typography
                        sx={{ mb: 2 }}
                    >
                        Leave a Review
                    </Typography>
                    <TextField
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TextareaAutosize
                        placeholder="Short description of the appointment"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '16px', fontSize: '16px' }}
                    // sx={{ mb: 2 }}
                    />
                    <TextField
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Rating (1-5)"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        sx={{ mt: 2 }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ mt: 2 }}
                        disabled={!name || !description || rating < 1 || rating > 5}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onCloseModal}
                        sx={{ mt: 2, bgcolor: red[500] }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ReviewModal;
