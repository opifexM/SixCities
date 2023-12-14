import {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRouteType, AuthorizationStatusType} from '../../const';

interface PrivateRouteProps {
  authorizationStatus: AuthorizationStatusType;
  requiredAuthorizationStatus: AuthorizationStatusType;
  children: ReactElement;
  declinedElement: AppRouteType;
}

function PrivateRoute({ authorizationStatus, requiredAuthorizationStatus, children, declinedElement }: Readonly<PrivateRouteProps>) {
  return (
    requiredAuthorizationStatus === authorizationStatus
      ? children
      : <Navigate to={declinedElement}/>
  );
}

export default PrivateRoute;
