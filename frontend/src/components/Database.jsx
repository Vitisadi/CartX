import { useNavigate } from "react-router";
import logo from "../styles/db.png";

const Database = () => {

    const navigate = useNavigate();

    const redirectToDB = () => {
        navigate('/database');
    }

    return ( 
        <div>
            <img 
                className="view-db" 
                src={logo} 
                alt="logo" 
                onClick={redirectToDB}
                style={{
                    borderRadius: '50%', // Makes the image round
                    cursor: 'pointer', // Changes the cursor to indicate it's clickable
                }}
            />
        </div>
    );
}
 
export default Database;