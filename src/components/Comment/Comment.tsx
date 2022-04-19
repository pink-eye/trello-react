import React, { FC } from 'react'
import styled from 'styled-components'
import { IComment } from '../../types'

interface Props extends IComment {
	onRemove: (comment: IComment) => void
}

const Comment: FC<Props> = ({ onRemove, ...props }) => {
	return (
		<Root>
			<CommentContent>
				<CommentText>{props.text}</CommentText>
				<CommentAuthor>by {props.author}</CommentAuthor>
			</CommentContent>
			<CommentBtn onClick={() => onRemove(props)}>Remove</CommentBtn>
		</Root>
	)
}

export default Comment

const Root = styled.div`
	padding: 5px;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const CommentContent = styled.div``

const CommentText = styled.p`
	font-size: 0.9em;
	line-height: 1.2;
`

const CommentAuthor = styled.address`
	font-size: 0.7em;
	color: gray;
	margin-top: 5px;
`

const CommentBtn = styled.button`
	color: red;
	border-radius: 5px;
	background-color: white;
	border: 2px solid red;
	font-weight: 700;
	padding: 10px 20px;
`
