
import React, { Component } from 'react'
import { Row, Col, Collapse, Button, CardBody, Card } from 'reactstrap'
import { Icon } from 'react-fa'

export default class StoriesFilter extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            collapse: false
        }
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse })
    }
    render() {
        return(
            <div className="stories-filter">
                <a href="#" onClick={this.toggle}>
                    <Icon name="bars" />
                    <span>Filter</span>
                </a>
                <Collapse isOpen={this.state.collapse}>
                    hello collapse!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ad, doloremque. Itaque aliquam, et temporibus voluptatem! Sapiente corporis esse saepe, dolorem autem. Voluptatem nemo fugit delectus, amet veritatis quisquam dolore molestiae atque tempora quaerat, saepe, cumque dolorem sunt id illum aspernatur necessitatibus voluptatibus ratione velit! Consectetur veritatis sint quas in labore, aperiam dolor facilis! Perspiciatis suscipit, voluptatum et ducimus, sit cumque accusamus nihil autem commodi porro perferendis incidunt accusantium quae ipsum. Aperiam ex illo distinctio incidunt expedita, quae praesentium ipsum, veritatis nostrum quasi repudiandae error in illum. Quis aliquam recusandae optio ducimus, deserunt est repudiandae earum, sint magni, natus harum. Reiciendis voluptatum consequatur nam minima eveniet aliquid illum cum officia? Sed maxime nostrum ex omnis molestias iusto repudiandae fugiat eos qui perferendis aliquid a quas hic corporis, dolorum, dicta id, nobis impedit! Enim dolorem voluptate perferendis similique facere optio vitae quae nam commodi obcaecati! Harum impedit nobis ut molestias distinctio non voluptatem numquam excepturi quibusdam minima, vitae, aperiam, nihil ea voluptatum dolorum. Iste possimus delectus libero iusto rerum autem deleniti, quidem minus, tempora ipsam, voluptatum, atque architecto saepe eos mollitia laudantium. A quia eum consequuntur vitae officiis voluptatem culpa fugiat similique ea placeat, consequatur, reprehenderit ex ipsum amet ut inventore, eveniet blanditiis! Quo commodi, cumque officia nemo dolore aliquam delectus a quis hic facilis quae maiores, impedit, eveniet fuga deleniti reprehenderit rem inventore dicta ratione beatae veritatis asperiores blanditiis quibusdam distinctio aperiam! Error illum, est amet dolor molestiae ex, tenetur quae nesciunt unde dolore eveniet obcaecati perferendis magnam laudantium et cupiditate atque? Aspernatur et blanditiis necessitatibus dolores, nostrum enim. Dignissimos, earum aspernatur est consequuntur natus sint quas aliquid nobis, adipisci esse, architecto sapiente maiores. Vero voluptatibus reiciendis officia temporibus. Esse quam qui quae ad beatae earum ullam, facilis voluptate quos suscipit praesentium nisi voluptatum ipsum incidunt necessitatibus rem nostrum facere impedit voluptatibus ratione, eius consectetur. Doloremque pariatur, quam assumenda iusto? Ullam, debitis, facere! Modi aliquid, laborum consequatur aspernatur eum accusantium odit rerum incidunt minus tenetur sapiente similique porro velit alias magnam, quae voluptas temporibus a doloribus exercitationem mollitia? Impedit, et, nihil, neque soluta est reprehenderit tenetur ea dicta iste libero ducimus, debitis beatae obcaecati sint quod eveniet eaque distinctio. Ullam deleniti molestiae quam, id quasi aspernatur earum tempora recusandae deserunt debitis animi fugiat illo delectus repudiandae ea voluptates dolorem eius atque asperiores perferendis modi. Saepe deserunt impedit, quas, ullam doloremque optio! Tenetur, ad. Ratione atque excepturi quisquam, ullam exercitationem, ex ea reprehenderit ipsa dolore repellendus alias temporibus, animi nobis quidem sequi nemo vitae vero quas suscipit explicabo dignissimos. Ab sapiente vero corporis saepe, blanditiis, molestias natus, neque, nam pariatur nihil soluta maiores minima provident dolorum officia at maxime. Expedita iusto exercitationem aliquid quis magni esse ratione, beatae accusantium minima aspernatur delectus, quasi vitae, illum saepe itaque? Cupiditate, alias quae facere iusto. Fuga enim necessitatibus illo totam cum quam est, officiis animi mollitia. Sint iste magnam aliquid. Quas reprehenderit quis eos dolorem aliquid corporis esse officia sit, quasi sed possimus velit obcaecati laudantium natus nam dolorum odio harum. Unde alias, facere?
                </Collapse>
            </div>
        )
    }
}
