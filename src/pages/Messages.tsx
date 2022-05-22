import { useIonViewDidEnter } from "@ionic/react";
import { useEffect, useRef } from "react";
import Moment from "react-moment"

const Messages: React.FC<{ msg: any, user1: any }> = (data) => {
    useIonViewDidEnter(() => {
        scrollRef.current!.scrollIntoView({ behavior: "smooth" });
    })
    const scrollRef = useRef<null | HTMLDivElement>(null);
    console.log(data);
    useEffect(() => {
        scrollRef.current!.scrollIntoView({ behavior: "smooth" });
    }, [data.msg])
    return (
        <div className="base-container" >
            <div className={`${data.msg.from === data.user1 ? "my-text-div" : "friend-text-div"}`}>
                <div className={`${data.msg.from === data.user1 ? "my-text-container" : "friend-text-container"}`}>
                    <div ref={scrollRef} className={`${data.msg.from === data.user1 ? "my-text" : "friend-text"}`}>{data.msg.text}</div>
                    <div className="msg-time">
                        <Moment local format="hh:mm">{data.msg.createdAt.toDate()}</Moment>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;