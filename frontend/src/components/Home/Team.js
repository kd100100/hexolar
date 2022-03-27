import React from 'react'
import TeamPic from '../../assets/images/Team/KD.png'
import TeamPic1 from '../../assets/images/Team/HP.png'
import TeamPic2 from '../../assets/images/Team/VS.png'
import TeamPic3 from '../../assets/images/Team/AR.png'
import TeamPic4 from '../../assets/images/Team/MD.png'

function Team() {
    const competition = "scc"
    return (
        <div className="container teamPart">
            <div className="row">
                <div className="teamPart__title col-lg-12 blue-p">
                    Team Hexolar
                </div>
                {/* <div className="col-lg-2"></div>
                <div className="col-lg-4" style={{ position: 'relative' }}>
                    <div className="teamPart__card">
                        <img src={TeamPic1} alt="" className="teamPart__image"/>
                        <div className="teamPart__name blue-p">
                            Harshith
                        </div>
                    </div>
                </div>
                <div className="col-lg-4" style={{ position: 'relative' }}>
                    <div className="teamPart__card">
                        <img src={TeamPic} alt="" className="teamPart__image"/>
                        <div className="teamPart__name blue-p">
                            Keerthivasan
                        </div>
                    </div>
                </div>
                <div className="col-lg-2"></div> */}
                <div className="col-lg-3" style={{ position: 'relative' }}>
                    <div className="teamPart__card">
                        <img src={TeamPic3} alt="" className="teamPart__image"/>
                        <div className="teamPart__name blue-p">
                            Abishek
                        </div>
                    </div>
                </div>
                <div className="col-lg-3" style={{ position: 'relative' }}>
                    <div className="teamPart__card">
                        <img src={TeamPic1} alt="" className="teamPart__image"/>
                        <div className="teamPart__name blue-p">
                            Harshith
                        </div>
                    </div>
                </div>
                <div className="col-lg-3" style={{ position: 'relative' }}>
                    <div className="teamPart__card">
                        <img src={TeamPic} alt="" className="teamPart__image"/>
                        <div className="teamPart__name blue-p">
                            Keerthivasan
                        </div>
                    </div>
                </div>
                <div className="col-lg-3" style={{ position: 'relative' }}>
                    <div className="teamPart__card">
                        <img src={TeamPic4} alt="" className="teamPart__image"/>
                        <div className="teamPart__name blue-p">
                            Manoah
                        </div>
                    </div>
                </div>
                <div className="teamPart__content col-lg-12 blue-s">
                    We believe that together we can accomplish a job worth doing, and a success worth reaching and making the earth an energetic⚡place to live.
                </div>
            </div>
        </div>
    )
}

export default Team
