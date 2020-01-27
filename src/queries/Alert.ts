import { gql } from 'apollo-boost';

export const GET_ALERTS_PAGE = gql`
    query getAlertsPage($keyword: String, $size: Float, $page: Float, $sort: Float){
        getAlertsPage(
            size: $size
            page: $page
            keyword: $keyword
            sort: $sort
        ) {
            data {
                _id
                delay
                keyword
                sendTo
                nextMessage
            }
            count
        }
    }
`;

export const GET_ALL_ALERTS = gql`
    {
        getAllAlerts {
            _id
            sendTo
            keyword
            delay
            isActive
            nextMessage
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_ALERT_INPUT = gql`
    input CreateAlertInputType {
        delay: Int!
        keyword: String!
        sendTo: String!
    }
`;

export const CREATE_ALERT = gql`
    mutation createAlert($alert: CreateAlertInputType!) {
        createAlert(alert: $alert)
    }
`;

export const UPDATE_ALERT = gql`
    mutation updateAlert($id: String!, $alert: UpdateAlertInputType!) {
        updateAlert(id: $id, alert: $alert)
    }
`;

export const DELETE_ALERT = gql`
    mutation deleteAlert($id: String!) {
        deleteAlert(id: $id)
    }
`;

export const UPDATE_ALERT_INPUT = gql`
    input UpdateAlertInputType {
        delay: Int
        keyword: String
        sendTo: String
    }
`;

export const GET_ALERTS_BY_SEND_TO = gql`
    query getAlertsBySendTo($sendTo: String!) {
      getAlertsBySendTo(sendTo: $sendTo) {
        _id
        sendTo
        keyword
        delay
        isActive
        nextMessage
        createdAt
        updatedAt
      }
    }
`;
