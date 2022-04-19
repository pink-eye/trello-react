import React, { ChangeEvent, Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import styled from 'styled-components'
import { ICard, IColumn, IComment } from '../../types'
import appStorage from '../../utils/Storage'
import Comment from '../Comment'
import { v4 as uuidv4 } from 'uuid'

interface Props extends ICard {
	column: IColumn
	commentArray: IComment[]
	cardArray: ICard[]
	setCommentArray: Dispatch<SetStateAction<IComment[]>>
	setCardArray: Dispatch<SetStateAction<ICard[]>>
}

const OpenedCard: FC<Props> = ({ commentArray, setCommentArray, column, setCardArray, cardArray, ...props }) => {
	const inputCommentRef = useRef<HTMLInputElement>(null)

	const addComment = () => {
		const inputComment = inputCommentRef.current

		if (inputComment?.value.length) {
			const savedName = appStorage.get('name')

			if (savedName) {
				const commentText = inputComment.value
				const newComment = { text: commentText, author: savedName, id: uuidv4(), cardId: props.id }
				const newCommentArray = [...commentArray, newComment]

				inputComment.value = ''
				setCommentArray(newCommentArray)
			}
		}
	}

	const removeComment = (comment: IComment) => {
		const savedName = appStorage.get('name')

		if (savedName === comment.author) {
			const updatedCommentArray = commentArray.filter(item => item.id !== comment.id)
			setCommentArray(updatedCommentArray)
		}
	}

	const handleChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const newTitle = target.value
		const updatedCardArray = cardArray.map(item => {
			if (item.id === props.id) {
				item.title = newTitle
			}

			return item
		})

		setCardArray(updatedCardArray)
	}

	const handleChangeDescription = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const newDescription = target.value
		const updatedCardArray = cardArray.map(item => {
			if (item.id === props.id) {
				item.description = newDescription
			}

			return item
		})

		setCardArray(updatedCardArray)
	}

	const filteredCommentArray = commentArray.filter(item => item.cardId === props.id)

	return (
		<Root>
			<OpenedCardColumn>{column?.title} </OpenedCardColumn>
			<OpenedCardTitle
				defaultValue={props.title}
				placeholder="Name of card"
				onChange={handleChangeTitle}></OpenedCardTitle>
			<OpenedCardAuthor>by {props.author}</OpenedCardAuthor>
			<OpenedCardDescription
				onChange={handleChangeDescription}
				defaultValue={props.description}
				placeholder="Description of card"></OpenedCardDescription>
			{filteredCommentArray.length ? (
				<OpenedCardCommentList>
					{filteredCommentArray.map((comment, index) => (
						<OpenedCardCommentItem key={index}>
							<Comment {...comment} onRemove={removeComment} />
						</OpenedCardCommentItem>
					))}
				</OpenedCardCommentList>
			) : (
				<></>
			)}
			<OpenedCardBottom>
				<OpenedCardInput ref={inputCommentRef} type="text" placeholder="Type a comment..." />
				<OpenedCardBtn onClick={addComment}>Send</OpenedCardBtn>
			</OpenedCardBottom>
		</Root>
	)
}

export default OpenedCard

const Root = styled.div``

const OpenedCardColumn = styled.span`
	display: block;
	text-align: right;
`

const OpenedCardTitle = styled.input`
	font-size: 1.5em;
	font-weight: 700;
	border: 0;
	padding-block: 5px;
	width: 100%;
	margin-top: 10px;
`

const OpenedCardAuthor = styled.address`
	font-size: 0.8em;
	color: gray;
	margin-top: 5px;
`

const OpenedCardDescription = styled.input`
	margin-top: 20px;
	line-height: 1.3;
	font-size: 1.1em;
	width: 100%;
	padding-block: 10px;
	border: 0;
	border-bottom: 2px solid lightgray;
`

const OpenedCardCommentList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 5px;
	background-color: lightgray;
	border-radius: 5px;
	margin-top: 10px;
	overflow-y: auto;
`

const OpenedCardCommentItem = styled.li``

const OpenedCardBottom = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 20px;
`

const OpenedCardInput = styled.input`
	width: 100%;
	padding-inline: 10px;
	flex: 0 0 70%;
	border: 0;
	border-bottom: 2px solid lightgray;
`

const OpenedCardBtn = styled.button`
	color: gray;
	border: 2px solid gray;
	font-weight: 700;
	padding: 10px 20px;
	width: 100%;
	background-color: white;
	border-radius: 5px;
`
