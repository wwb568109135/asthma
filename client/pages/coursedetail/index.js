const app = getApp()

const { courseDetail } = require('../../utils/api');
const star = '../../images/star_gan.png';
const starActive = '../../images/star_gan_active.png';

Page({
    data: {
        starImages: [],
        // 页面的宽高属性
        winWidth: 0,
        winHeight: 0,
        // tab切换
        currentTab: 0,
        course: {}
    },
    onLoad: function(option) {
        const that = this;
        this.setImages();
        wx.pro.getSystemInfo().then((res) => {
            this.setData({winWidth: res.windowWidth, winHeight: res.windowHeight});
        }).catch((err) => {
            console.log(err);
        })

        wx.pro.request({
            url: courseDetail(option.id),
            method: "GET",
            header: {
                'content-type': 'application/json'
            }
        }).then((data) => {
            that.setData({course: data.course});
        }).catch((err) => {
            console.log(err);
        })

    },
    setImages() {
        const starImages = [];
        for (let i = 0; i < 5; i++) {
            starImages.push(star);
        }
        this.setData({starImages});
    },
    bindChange(e) {
        const that = this;
        that.setData({currentTab: e.detail.current});
    },

    switchNav(e) {
        const that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({currentTab: e.target.dataset.current})
        }
    },
    changeStar(e) {
        const starImages = [];
        const index = e.target.dataset.gindex;
        const that = this;
        for (let i = 0; i < 5; i++) {
            if (i <= index) {
                starImages.push(starActive);
            } else {
                starImages.push(star);
            }
        }
        that.setData({starImages});
    },

    submitRating() {
        const that = this;
        const rating = that.data.starImages.filter((image) => image === starActive).length;
        console.log(rating);
    },
    playFirstVideo() {
        const that = this;
        const course = that.data.course.courseware[0];
        if (course && course.videoUrl) {
            wx.navigateTo({
                url: `../videoplayer/index?videoUrl=${course.videoUrl}`
            });
        }
    },
    playVideo(e) {
        const that = this;
        const index = e.target.dataset.index;
        const { courseware } = that.data.course;
        console.log(index);
        console.log(courseware);
        if (courseware[index] && courseware[index].videoUrl) {
            wx.navigateTo({
                url: `../videoplayer/index?videoUrl=${courseware[index].videoUrl}`
            });
        }
    }
})