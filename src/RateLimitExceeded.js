import React from "react";

const RateLimitExceeded = () => {
    return (
        <div className="noResults">
            <p>This application is considered to be in demo mode by Unsplash, so the API currently places a limit of 50 requests per hour. You have exceeded this rate limit.</p>
            <p>This is more likely to occur when searching Collections, as a Collection query word will be associated with several Unsplash Collections, resulting in more pings to the API. </p>
        </div>
    )
}

export default RateLimitExceeded;