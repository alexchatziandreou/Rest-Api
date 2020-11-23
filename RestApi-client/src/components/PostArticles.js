import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/PostArticle";
import * as actions1 from "../actions/Categories";

import { Grid, Paper, withStyles, List, ListItem, ListItemText, Typography, Divider, Button } from "@material-ui/core";
import PostArticleForm from "./PostArticleForm";

import ButterToast, { Cinnamon } from "butter-toast";
import { ChangeHistory, DeleteSweep } from "@material-ui/icons";
//  const Members = require('./Categories');



const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    smMargin: {
        margin: theme.spacing(1)
    },
    actionDiv: {
        textAlign: "center"
    }
})

const PostArticles = ({classes, ...props}) => {
    const [currentId, setCurrentId] = useState(0)
    const [currentIdCat, setCurrentIdCat] = useState(0)
    useEffect(() => {
        props.fetchAllPostMessages()
    }, [])//DidMount

    const onDelete = id => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Articles"
                    content="Deleted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                />
            })
        }
        if (window.confirm('Are you sure to delete this record?'))
            props.deletePostMessage(id,onSuccess)
    }


    return (
        <Grid container>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <PostArticleForm {...{ currentId, setCurrentId }} />
                </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                    <List>
                        {
                            props.PostArticleList.map((record, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>
                                                <Typography variant="h5">
                                                    {record.title}
                                                </Typography>
                                                <div>
                                                    {record.content}
                                                </div>

                                                <div className={classes.actionDiv}>
                                                    <Button variant="contained" color="primary" size="small"
                                                        className={classes.smMargin}
                                                        onClick={() => setCurrentId(record._id)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="contained" color="secondary" size="small"
                                                        className={classes.smMargin}
                                                        onClick={() => onDelete(record._id)}>
                                                        Delete
                                                    </Button>
                                                </div>

                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li" />
                                    </Fragment>

                                )
                            })
                          }
                        </List>

                      </Paper>

                    </Grid>

          </Grid>

                );
             
              }
const Categories = ({classes, ...props1}) => {

useEffect(() => {
props1.fetchAllPostMessagesCat()
}, []);//DidMount

const onDelete = id => {
const onSuccess = () => {
ButterToast.raise({
    content: <Cinnamon.Crisp title="Articles"
        content="Deleted successfully"
        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
        icon={<DeleteSweep />}
    />
})
}
if (window.confirm('Are you sure to delete this record?'))
props1.deletePostMessage(id,onSuccess)
}


return (
<Grid container>
    <Grid item xs={5}>
        <Paper className={classes.paper}>

            <List>
            {
                props1.CategoriesList.map((record1, index1) => {
                    return (
                        <Fragment>
                        <ListItem>
                            <ListItemText>
                            <Typography variant="h6">
                                    {record1.name}
                            </Typography>
                        </ListItemText>
                        </ListItem>
                        <Divider component="li" />

                        </Fragment>
                    )
                })
            }

            </List>
        </Paper>
    </Grid>
</Grid>
    );
    }

const mapStateToProps = state => ({
    PostArticleList: state.PostArticle.list
})

const mapActionToProps = {
    fetchAllPostMessages: actions.fetchAll,
    deletePostMessage: actions.Delete
}
const mapStateToPropsCat = state1 => ({
    CategoriesList: state1.Categories.list
})

const mapActionToPropsCat = {
    fetchAllPostMessagesCat: actions1.fetchAll,
    deletePostMessage: actions1.Delete
}
export const CategoriesConnected = connect(mapStateToPropsCat, mapActionToPropsCat)(withStyles(styles)(Categories));

export const PostArticlesConnected = connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostArticles));
