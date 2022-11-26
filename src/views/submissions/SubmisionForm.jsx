import React from "react";
import { useState, useEffect } from "react";
import { validation } from "../../common/enums/submission.enum";
import { createSubmission } from "../../services/submission-services";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config.js";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";

export default function SubmissionForm() {
	const { addToast } = useContext(AppContext);
	const [title, setTitle] = useState("");
	const [titleValidator, setTitleValidator] = useState(false);
	const [coverPhoto, setCoverPhoto] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [description, setDescription] = useState("");
	const [descriptionValidator, setDescriptionValidator] = useState(false);

	const handleFileUpload = (e) => {
		setCoverPhoto(e.target?.files[0]);
		let value = URL.createObjectURL(e.target.files[0]);
		setImageUrl(value);
	};

	useEffect(() => {
		if (
			title.length > validation.MIN_LENGTH_TITLE &&
			title.length < validation.MAX_LENGTH_TITLE
		) {
			setTitleValidator(true);
		} else {
			setTitleValidator(false);
		}
		if (
			description.length > validation.MIN_LENGTH_DESCRIPTION &&
			description.length < validation.MAX_LENGTH_DESCRIPTION
		) {
			setDescriptionValidator(true);
		} else {
			setDescriptionValidator(false);
		}
	}, [title]);

	const sendData = async (e) => {
		e.preventDefault();
		const imageRef = ref(storage, `submission/${v4()}`);
		const file = coverPhoto;
		if (!titleValidator)
			addToast("error", "Title must between 2 - 30 characters");
		if (!file) addToast("error", "Choose a photo");
		if (titleValidator) {
			try {
				const result = await uploadBytes(imageRef, file);
				const url = await getDownloadURL(result.ref);
				setCoverPhoto(url);
				await createSubmission(title, description, url);
			} catch (error) {
				addToast("error", error.message);
			}
		}
	};

	return (
		<div className="submission-form">
			<div className="flex flex-wrap justify-around">
				<div className="card lg:card-side bg-base-100 shadow-xl">
					<figure>
						<img
							src={
								imageUrl !== "" ? imageUrl : "https://placeimg.com/400/400/arch"
							}
							className="h-[350px]"
							alt="Album"
						/>
					</figure>
					<div className="card-body">
						<label className="label">Title</label>
						<input
							className="input input-bordered border-white w-full max-w-full mb-6"
							placeholder="Type here"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type="text"
						/>
						<label className="label">Choose a photo to participate</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleFileUpload}
							className="file-input file-input-bordered file-input-info w-full max-w-full mb-6"
						/>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							type="text"
							placeholder="Your story"
							className="textarea textarea-primary w-full max-w-xs text-white"
						/>
						<button className="btn btn-primary mt-14" onClick={sendData}>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
