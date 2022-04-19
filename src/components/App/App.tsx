import React, { useEffect, useState } from 'react'
import Welcome from '../Welcome'
import Header from '../Header'
import appStorage from '../../utils/Storage'
import Modal from '../Modal'
import ColumnList from '../ColumnList'

const App = () => {
	const [hasAccess, setHasAccess] = useState(false)

	useEffect(() => {
		const savedName = appStorage.get('name')

		if (savedName) setHasAccess(true)
	}, [])

	return (
		<>
			<Header />
			<main>
				<ColumnList />
			</main>
			{!hasAccess && (
				<Modal isOpen={true}>
					<Welcome setHasAccess={setHasAccess} />
				</Modal>
			)}
		</>
	)
}

export default App
