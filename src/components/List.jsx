export default function List(props) {
    const { title,type,classType,data,callback } = props
    
    return (
        <>
            <h4 className='p-2 m-2'>{title}</h4>
            <ul className="d-flex flex-column gap-3 p-2">
                {data.length === 0 && <h6 className='text-center'>No available {title}.</h6>}
                {data.map( item => {
                    return (
                        <li key={item.id} className="d-flex gap-2 p-2">
                            <i className="bi bi-people-fill"/>
                            <a className="" href="#">{item.name}</a>
                        </li>
                    )
                } )}
                <button variant="primary" className={classType} onClick={() => callback(true)}>Create Channel</button>
            </ul>
        </>
    )
}