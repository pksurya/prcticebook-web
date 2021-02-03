import { connect } from 'react-redux'
import React from 'react';
import AdSense from 'react-adsense';

const mapStateToProps = (state: any) => state

const GoogleAds: React.SFC<any> = () => {
    return (
        <div>
            <AdSense.Google
                client='ca-pub-3106891907091599'
                slot='6309283517'
                format='auto'
                responsive='true'
            />
            <AdSense.Google
                client='ca-pub-3106891907091599'
                slot='2446415345'
                format='auto'
                responsive='true'
            />
            <AdSense.Google
                client='ca-pub-3106891907091599'
                slot='7877338445'
                format='auto'
                responsive='true'
            />
            <AdSense.Google
                client='ca-pub-3106891907091599'
                slot='4421486773'
                format='auto'
                responsive='true'
            />
            <AdSense.Google
                client='ca-pub-3106891907091599'
                slot='5542996752'
                format='auto'
                responsive='true'
            />
            <AdSense.Google
                client='ca-pub-3106891907091599'
                slot='2916833417'
                format='auto'
                responsive='true'
            />
            <AdSense.Google
                client='ca-pub-3106891907091599'
                slot='3030483674'
                format='auto'
                responsive='true'
            />
            <AdSense.Google
                client='ca-pub-3106891907091599'
                slot='4151993657'
                format='auto'
                responsive='true'
            />
            <AdSense.Google
                client='ca-pub-3106891907091599'
                slot='5273503634'
                format='auto'
                responsive='true'
            />
            <AdSense.Google
                client='ca-pub-3106891907091599'
                slot='2647340296'
                format='auto'
                responsive='true'
            />
        </div>
    )
}

export default connect<any>(mapStateToProps)(GoogleAds)
