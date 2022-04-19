import React, { ChangeEvent, useRef, useState, FC, Dispatch, SetStateAction } from 'react'
import styled, { css } from 'styled-components'
import appStorage from '../../utils/Storage'

interface Props {
	setHasAccess: Dispatch<SetStateAction<boolean>>
}

const Welcome: FC<Props> = ({ setHasAccess }) => {
	const [isDisabledBtn, setIsDisabledBtn] = useState(true)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleClick = () => {
		const name = inputRef.current?.value

		if (typeof name === 'string') {
			appStorage.set('name', name)
			setHasAccess(true)
		}
	}

	const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (target.value.length) {
			isDisabledBtn && setIsDisabledBtn(false)
		} else {
			!isDisabledBtn && setIsDisabledBtn(true)
		}
	}

	return (
		<Root>
			<WelcomeTitle>Hello, stranger!</WelcomeTitle>
			<form>
				<WelcomeInput
					ref={inputRef}
					type="text"
					onChange={handleChange}
					placeholder="Type your name to continue"
				/>
				<WelcomeButton $isDisabled={isDisabledBtn} onClick={handleClick}>
					Continue
				</WelcomeButton>
			</form>
		</Root>
	)
}

export default Welcome

const Root = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`

const WelcomeTitle = styled.h2`
	font-size: 2em;
`

const WelcomeInput = styled.input`
	padding: 10px 20px;
	font-size: 1em;
	width: 100%;
`

interface StyleProps {
	$isDisabled: boolean
}

const WelcomeButton = styled.button`
	margin-top: 10px;
	padding: 10px;
	background-color: blue;
	color: hsl(255, 100%, 100%);
	border-radius: 5px;
	font-weight: 700;
	width: 100%;

	${(props: StyleProps) =>
		props.$isDisabled &&
		css`
			opacity: 0.3;
			cursor: not-allowed;
		`}
`
