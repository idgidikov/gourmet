import React from "react"

function SubmissionReview({ review, setReview, setData, setScore }) {

    function handleOnChange(e) {
        setReview(e.target.value)

    }
    function handleOnClick() {
        setData((prev) => ({

            ...prev,
            review
        }))
    }

    return (
        <div className="card w-96 bg-neutral text-neutral-content">
            <div className="card-body">
                <textarea value={review} className="textarea textarea-primary"
                    placeholder="Write your review"
                    onChange={handleOnChange} />
                <button className="btn btn-active btn-primary"
                    onClick={handleOnClick}
                >Submit</button>
            </div>
        </div>
    )
}

export default SubmissionReview