import { useState, useEffect } from "react"
import axios from "axios"

function Sample() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    axios.get('http://localhost:8080/exampleRoute')
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    // axios.post('http://localhost:8080/exampleRoute', { key1: 'value1', key2: 'value2' })
    // .then(response => {
    //     // handle success
    // })
    // .catch(error => {
    //     // handle error
    // });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {/* Map through the data array and display each name */}
            {data.map(item => (
            <p key={item.id}>{item.name}</p>
            ))}
        </div>
    );
}

export default Sample;