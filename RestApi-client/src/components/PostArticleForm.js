import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/PostArticle";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    title: '',
    content: ''
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    postBtn: {
        width: "50%"
    }
})

const PostArticleForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.PostArticleList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.title = values.title ? "" : "This field is required."
        temp.content = values.content ? "" : "This field is required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content="Submitted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if (validate()) {
            if (props.currentId == 0)
                props.createArticle(values, onSuccess)
            else
                props.updateArticle(props.currentId, values, onSuccess)
        }
    }

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                value={values.title}
                onChange={handleInputChange}
                {...(errors.title && { error: true, helperText: errors.title })}
            />
            <TextField
                name="content"
                variant="outlined"
                label="Content"
                fullWidth
                multiline
                rows={4}
                value={values.content}
                onChange={handleInputChange}
                {...(errors.content && { error: true, helperText: errors.content })}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.postBtn}
            >Submit</Button>
        </form>
    );
}


const mapStateToProps = state => ({
    PostArticleList: state.PostArticle.list
})

const mapActionToProps = {
    createArticle: actions.create,
    updateArticle: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostArticleForm));
