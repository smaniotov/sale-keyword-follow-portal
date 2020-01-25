import { gql } from 'apollo-boost';

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
