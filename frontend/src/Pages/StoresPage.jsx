import React from 'react';
import Header from "../components/Header";
import { useStoreData } from "./StoresHolder";

const StoresPage = () => {
    const { storeData } = useStoreData();
    console.log("Stores Data: ", storeData);

    // CSS-in-JS styles
    const styles = {
        container: {
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto'
        },
        brandsContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap'
        },
        brandSection: {
            flexBasis: '30%', // Adjust based on how much space you want each column to take
            padding: '10px'
        },
        brandHeading: {
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
            textTransform: 'capitalize'
        },
        storeList: {
            listStyle: 'none',
            padding: '0',
            margin: '20px 0'
        },
        storeItem: {
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        },
        storeName: {
            fontWeight: 'bold'
        },
        storeAddress: {
            color: '#666'
        },
        h1: {
            textAlign: 'center'
        }
    };

    return ( 
        <div>
            <Header />
            <div style={styles.container}>
                <h1>Nearby Stores from your given location</h1>
                <div style={styles.brandsContainer}>
                    {storeData && Object.entries(storeData).map(([brand, stores]) => (
                        <div key={brand} style={styles.brandSection}>
                            <h2 style={styles.brandHeading}>{brand}</h2>
                            <ul style={styles.storeList}>
                                {stores.map((store, index) => (
                                    <li key={index} style={styles.storeItem}>
                                        <p style={styles.storeName}><strong>Store Name:</strong> {store.name}</p>
                                        <p style={styles.storeAddress}><strong>Address:</strong> {store.address}</p>
                                        {/* <p><strong>Latitude:</strong> {store.latitude}</p>
                                        <p><strong>Longitude:</strong> {store.longitude}</p> */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}

export default StoresPage;