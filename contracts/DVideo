// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.6;

contract DVideo{
    uint public videoCount = 0;
    string public name = "DVideo";

    struct Video{
        uint videoId;
        string videoHash;
        string videoTitle;
        address author;
    }

    mapping(uint => Video) public videos;
    event VideoUploaded(
        uint videoId,
        string videoHash,
        string videoTitle,
        address author
    );

    constructor() public {

    }

    function uploadVideo(string memory _videoHash, string memory _videoTitle) public {

        require(bytes(_videoTitle).length > 0);

        require(bytes(_videoHash).length > 0);

        require(msg.sender != address(0));

        videoCount++;
        videos[videoCount] = Video(videoCount, _videoHash, _videoTitle, msg.sender);
        emit VideoUploaded(videoCount, _videoHash, _videoTitle, msg.sender);
    }
}
