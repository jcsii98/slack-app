export default function SidebarList(props) {
    const { title, type, user } = props

    const handleOnClick = () => {
        // gets otherUser data and displays it to Chat component
    }

    return (
        <div>
            <h1>{title}</h1>
            <ul className="sidebar-item nav nav-tabs flex-grow-1">
                {user[type].length === 0 && "You have no friends!"}
                {user[type].map( otherUser => {
                    return (
                        <li className="nav-item">
                            <button onClick={handleOnClick}>{ otherUser.name }</button>
                            <button className="btn-delete"/>
                        </li>
                    )
                } )}
            </ul>
        </div>
    );
}