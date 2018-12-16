import React, { Component } from "react";
import { Link } from "../routes";
import { Menu, Icon, Button, Image, Container } from "semantic-ui-react";
import Router from "next/router";
import NProgress from "next-nprogress";
import NProgressStyles from "next-nprogress/styles";

/*Router.onRouteChangeStart = url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();*/

class HeaderHome extends Component {
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

					<Menu.Item name="Home">
						<Link route="/">
							<a>
								<Image src="../static/favicon.ico" avatar />
							</a>
						</Link>
					</Menu.Item>
					<Menu.Item header>
						<Link route="/">
							<a>Patient Wallet</a>
						</Link>
					</Menu.Item>

					<Menu.Menu position="right">
						<Menu.Item name="signup">
							<Link route={"/wallet/signup"}>
								<a>
									<Button circular color="facebook" animated>
										<Button.Content visible>
											Join Us!
											<Icon
												name="heartbeat"
												style={{ marginLeft: "2px" }}
											/>
										</Button.Content>
										<Button.Content hidden>
											Sign Up!
											<Icon
												name="heartbeat"
												style={{ marginLeft: "2px" }}
											/>
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
											Your Wallet!
											<Icon
												name="medkit"
												style={{ marginLeft: "2px" }}
											/>
										</Button.Content>
										<Button.Content hidden>
											Log in!
											<Icon
												name="medkit"
												style={{ marginLeft: "2px" }}
											/>
										</Button.Content>
									</Button>
								</a>
							</Link>
						</Menu.Item>
						<Menu.Item name="provider">
							<Link route="/wallet/provider/providerLogin">
								<a>
									<Button circular positive animated>
										<Button.Content visible>
											Doctors!
											<Icon
												name="user md"
												style={{ marginLeft: "2px" }}
											/>
										</Button.Content>
										<Button.Content hidden>
											Log in!
											<Icon
												name="user md"
												style={{ marginLeft: "2px" }}
											/>
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

export default HeaderHome;
