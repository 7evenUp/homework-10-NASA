import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeSol, fetchPhotosRequest } from '../../modules/RoverPhotos' 
import SelectSol from '../SelectSol'
import RoverPhotos from '../RoverPhotos'
import { getApiKey } from '../../modules/Auth'
import { getSol, getPhotos } from '../../modules/RoverPhotos'
import styles from './RoversViewer.module.css'

const mapNames = ['curiosity', 'opportunity', 'spirit']

class RoversViewer extends Component {
    componentDidMount() {
        const { fetchPhotosRequest, apiKey } = this.props
        mapNames.forEach(name => {
            fetchPhotosRequest({ name, sol: 1, key: apiKey })
        })
    }

    render() {
        const { changeSol, data, sol: {current, min, max}, fetchPhotosRequest, apiKey } = this.props
        return (
            <div className={styles.root}>
                <SelectSol 
                    selectedSol={current}
                    minSol={min}
                    maxSol={max}
                    changeSol={changeSol}
                    key={apiKey}
                    fetchPhotosRequest={fetchPhotosRequest}
                    data={data}
                />
                <div className={styles.сontainer}>
                    {mapNames.map(name => {
                        const obj = data[name] && data[name][current]
                        if (obj && 'isLoading' in obj && !obj.isLoading) { 
                            return <RoverPhotos photos={obj.photos} name={name} key={name} />
                        }
                        return null
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    sol: getSol(state),
    data: getPhotos(state),
    apiKey: getApiKey(state)
})

const mapDispatchToProps = { changeSol, fetchPhotosRequest }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoversViewer)