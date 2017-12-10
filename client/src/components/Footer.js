
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Icon } from 'react-fa'
import '../styles/partials/footer.scss'

export default () => (
    <footer className="footer">
        <Container>
            <Row>
                <Col md="12">
                    <Icon name="copyright"></Icon> All right reserved.
                </Col>
            </Row>
        </Container>
    </footer>
)
