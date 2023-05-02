import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    let [updateTitle, setUpdateTitle] = useState(props.oldTitle)

    const [edit, setEdit] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(updateTitle)
    }

    const editHandler = () => {
        setEdit(!edit)
        if(edit) addTask()
    }

    return (
        edit
            ? <input value={updateTitle} onChange={onChangeHandler} onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

