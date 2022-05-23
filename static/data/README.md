# link_(branch name).json
When editing a link file 'link_(branch name).json' the format is as followed. ONLY EDIT LINKS FOR YOUR BRANCH.

```` json
[
    {
        "title": "Air Force Weather Agency",
        "url": "https://weather.af.mil/",
        "description": "Air Force Weather Agency is the weather presented by the Air Force.",
        "cardId": 23
    },
    {...}
]

````

The text attribute is displayed for the link. The url property is the url you would like to go to when the link is clicked. The description property is a detailed set of text to explane to the user what the link is. The cardId is a number that matches with a card image that will be used for displaying the link as a card. 


# branches.json
The branches.json file holds an array of all the branches of the military. This will only need to be edited when the military adds or removes a branch.


# categories_(branch name).json
This file provides quick catigories that will show up in the drop down menu to bring up links based on a catigory. ONLY EDIT THE FILE FOR YOUR BRANCH.
