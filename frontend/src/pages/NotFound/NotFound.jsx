import React from 'react';
import { NotFoundContainer, CenteredContent, ErrorCode, ErrorTitle, ErrorText, ButtonRow } from './styledComponents.jsx';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

/**
 * 404 Not Found Page
 */

const NotFound = () => {
  return (
    <NotFoundContainer>
      <CenteredContent>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorText>
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </ErrorText>
        <ButtonRow>
          <Link to="/">
            <Button variant="primary" size="lg">
              <Home /> Go Home
            </Button>
          </Link>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft /> Go Back
          </Button>
        </ButtonRow>
      </CenteredContent>
    </NotFoundContainer>
  );
};

export default NotFound;