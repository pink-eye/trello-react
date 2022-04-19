import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'
import { ICard } from '../../types'

interface Props extends ICard {
	onOpen: (card: ICard) => void
	onRemove: (card: ICard) => void
	comments: number
}

const Card: FC<Props> = ({ onOpen, onRemove, ...props }) => {
	const handleClickRemove = (event: MouseEvent) => {
		event.stopPropagation()
		onRemove(props)
	}

	const handleClickCard = () => onOpen(props)

	return (
		<Root onClick={handleClickCard}>
			<CardTitle>{props.title}</CardTitle>
			<CardAuthor>by {props.author}</CardAuthor>
			<CardComments>{props.comments} comments</CardComments>
			<CardBtn onClick={handleClickRemove}>Remove</CardBtn>
		</Root>
	)
}

export default Card

const Root = styled.article`
	cursor: pointer;
	background-color: white;
	border-radius: 5px;
	padding: 15px;
	border: 2px solid hsl(0, 0%, 93%);
`

const CardTitle = styled.h4`
	font-size: 1em;
`

const CardAuthor = styled.address`
	margin-top: 5px;
	font-size: 0.8em;
	color: gray;
`

const CardComments = styled.span`
	display: inline-block;
	font-size: 0.8em;
	margin-top: 20px;
	color: gray;
`

const CardBtn = styled.button`
	margin-top: 5px;
	color: red;
	border-radius: 5px;
	background-color: white;
	border: 2px solid red;
	font-weight: 700;
	padding: 10px 20px;
	width: 100%;
`
