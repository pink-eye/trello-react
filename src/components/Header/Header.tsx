import React from 'react'
import styled from 'styled-components'

const Header = () => {
	return (
		<Root>
			<span>Trello 2.0</span>
		</Root>
	)
}

export default Header

const Root = styled.header`
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 10px 15px;
	font-weight: 700;
	font-size: 2em;
	box-shadow: 0 0 20px 1px hsl(0, 0%, 80%);
`
