import ReactStars from "react-rating-stars-component";
const LevelTwo = ({ }) => {
    return (
        <div className="review" style={{ marginLeft: '60px' }}>
            <div className="d-flex gap-10 align-items-center">
                <h6 className="mb-0">Navdeep</h6>
                <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                />
            </div>
            <p className="mt-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consectetur fugiat ut excepturi quos. Id reprehenderit
                voluptatem placeat consequatur suscipit ex. Accusamus dolore
                quisquam deserunt voluptate, sit magni perspiciatis quas
                iste?
            </p>
        </div>
    )
}

export default LevelTwo;