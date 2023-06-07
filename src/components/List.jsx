export default function List(props) {
    const {handleClick, title, classType, data, callback} = props;

    return (
        <div className='padding-0 d-flex flex-column justify-content-center p-0'>
            <h4 className='p-2 m-2'>{title}</h4>
            <ul
                className='nav-tabs container-fluid d-flex flex-column gap-1 pb-3 px-4 m-0'
                style={{
                    fontSize: '0.9rem',
                    overflow: 'auto',
                    maxHeight: '15rem',
                }}
            >
                {data.length === 0 && (
                    <h6 className='text-center'>No available {title}.</h6>
                )}
                {data.map((item) => {
                    const receiverID = item[0];
                    const receiverName = item[1];
                    return (
                        <li
                            key={item.id ?? receiverID}
                            className='padding-lr-1 nav-link sidebar-item d-flex gap-3 justify-content-start align-items-center'
                        >
                            {title === 'Channels' ? (
                                <i
                                    className='bi bi-people-fill'
                                    style={{fontSize: '1.5rem'}}
                                />
                            ) : (
                                <i
                                    className='bi bi-person-circle'
                                    style={{fontSize: '1.7rem'}}
                                ></i>
                            )}
                            <button
                                className='bg-transparent nav-link border-0'
                                style={{color: 'white'}}
                                onClick={() =>
                                    handleClick(item.id ?? receiverID)
                                }
                            >
                                {item.name ?? receiverName}
                            </button>
                        </li>
                    );
                })}
            </ul>
            <button
                variant='primary'
                className={classType}
                onClick={() => callback(true)}
            >
                Create Channel
            </button>
        </div>
    );
}
