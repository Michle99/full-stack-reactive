import React, { Component } from 'react';

interface Profile {
  id: number;
  email: string;
}

interface ProfileListProps {
}

interface ProfileListState {
  profiles: Array<Profile>;
  isLoading: boolean;
}

class ProfileListPollInterval extends Component<ProfileListProps, ProfileListState> {
  private interval: any; 

  constructor(props: ProfileListProps) {
    super(props);

    this.state = {
      profiles: [],
      isLoading: false
    };
  }

  async fetchData() {
    this.setState({isLoading: true});

    const response = await fetch('http://localhost:3000/profiles');
    const data = await response.json();
    this.setState({profiles: data, isLoading: false});
  }

  async componentDidMount() {
    await this.fetchData(); 
    this.interval = setInterval(() => this.fetchData(), 5000); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {profiles, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>Profile List</h2>
        {profiles.map((profile: Profile) =>
          <div key={profile.id}>
            {profile.email}<br/>
          </div>
        )}
        <a href="/" className="App-link">Home</a>
      </div>
    );
  }
}

export default ProfileListPollInterval;