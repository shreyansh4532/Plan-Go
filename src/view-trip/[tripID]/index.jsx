import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import Footer from "../components/Footer";
import PlacesToVisit from "../components/PlacesToVisit";

function ViewTrip() {

    const {tripID} = useParams();

    const [trip, setTrip] = useState([]);

    useEffect(() => {
        getTripData();
    }, [tripID])

    const getTripData = async () => {
        const docRef = doc(db, "AItrips", tripID);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setTrip(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          toast.error("No Trip Found.")
        }
    }

  return (
    <div className="sm:px-10 md:px-25 lg:px-48 xl:px-60 px-5">
        {/* Info section */}
        <InfoSection trip={trip}/>

        {/* Recom. hotels */}
        <Hotels trip={trip}/>

        {/* Itinerary / Daily plan */}
        <PlacesToVisit trip={trip}/>

        {/* Footer */}
        <Footer />
    </div>
  )
}

export default ViewTrip