import React, { Component } from "react";
import { Link } from "../routes";
import { Menu, Icon, Button, Dropdown, Container, Image } from "semantic-ui-react";
import Router from "next/router";
import NProgress from "next-nprogress";
import NProgressStyles from "next-nprogress/styles";


/*Router.onRouteChangeStart = url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();*/

class HeaderWelcome extends Component {
	
	render() {
		return (
			<div>
				<NProgressStyles spinner={false} />
				<Menu
					size="massive"
					inverted
					borderless
					style={{ marginTop: "2px" }}
					fluid
				>
					<Menu.Item>
						<Icon name="ethereum" />
					</Menu.Item>
					<Menu.Item header>
						<Link route={`/wallet/${this.props.addressPromise}`}>
							<a>Patient Wallet</a>
						</Link>
					</Menu.Item>

					<Menu.Menu position="right">
						<Menu.Item name="signup">
							<Link route={"/wallet/login"}>
								<a>
									<Button circular color="facebook" animated>
										<Button.Content visible>
											Help!
											<Icon name="help circle" style={{marginLeft: "2px"}} />
										</Button.Content>
										<Button.Content hidden>
											Ask Us!
											<Icon name="help circle" style={{marginLeft: "2px"}} />
										</Button.Content>
									</Button>
								</a>
							</Link>
						</Menu.Item>

						<Menu.Item name="login">
							<Link route={"/wallet/login"}>
								<a>
									<Button circular color="facebook" animated>
										<Button.Content visible>
											Contact Us!
											<Icon name="at" style={{marginLeft: "2px"}} />
										</Button.Content>
										<Button.Content hidden>
											Mail us!
											<Icon name="at" style={{marginLeft: "2px"}} />
										</Button.Content>
									</Button>
								</a>
							</Link>
						</Menu.Item>
						<Menu.Item name="login">
							<Link route="/">
								<a>
									<Button circular color="youtube" animated>
										<Button.Content visible>
											Log out!
											<Icon name="log out" style={{marginLeft: "2px"}} />
										</Button.Content>
										<Button.Content hidden>
											See You!
											<Icon name="log out" style={{marginLeft: "2px"}} />
										</Button.Content>
									</Button>
								</a>
							</Link>
						</Menu.Item>
					</Menu.Menu>
				</Menu>
			</div>
		);
	}
}

export default HeaderWelcome;
